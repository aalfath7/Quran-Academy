import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import {
  createRegistration,
  deleteRegistration,
  getRegistration,
  isAlreadyRegistered,
  listRegistrations,
  normalizeWhatsapp,
  registrationEditSchema,
  registrationInputSchema,
  setRegistrationPaid,
  updateRegistration
} from "../src/lib/registrations";

const form = {
  name: "Ahmad Fauzi",
  whatsapp: "0812-3456-7890",
  age: "21",
  city: "",
  classId: "tajwid",
  readingLevel: "terbata",
  notes: "  ",
  ikhwan: true
};

describe("registration input", () => {
  it("normalizes WhatsApp numbers to the 62 form", () => {
    expect(normalizeWhatsapp("0812-3456-7890")).toBe("6281234567890");
    expect(normalizeWhatsapp("+62 812 3456 7890")).toBe("6281234567890");
    expect(normalizeWhatsapp("812 3456 7890")).toBe("6281234567890");
  });

  it("parses a filled form and drops empty optional fields", () => {
    const parsed = registrationInputSchema.parse(form);

    expect(parsed).toMatchObject({ whatsapp: "6281234567890", age: 21, city: null, notes: null });
  });

  it("requires a class, a valid number, and the ikhwan confirmation", () => {
    const result = registrationInputSchema.safeParse({ ...form, classId: "", whatsapp: "12345", ikhwan: false });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map(({ path }) => path[0]).sort()).toEqual(["classId", "ikhwan", "whatsapp"]);
  });
});

describe("registrations", () => {
  it("stores a sign-up once per number in a wave and marks it paid", async () => {
    const db = createDb(env.DB);
    const input = registrationInputSchema.parse(form);
    const id = await createRegistration(db, input, 1);

    expect(await isAlreadyRegistered(db, input.whatsapp, 1)).toBe(true);
    expect(await isAlreadyRegistered(db, input.whatsapp, 2)).toBe(false);

    const saved = async () => (await listRegistrations(db)).find((row) => row.id === id);
    expect(await saved()).toMatchObject({ classId: "tajwid", paid: false, paidAt: null, wave: 1 });

    await setRegistrationPaid(db, id, true);
    expect((await saved())?.paidAt).toBeInstanceOf(Date);

    await setRegistrationPaid(db, id, false);
    expect(await saved()).toMatchObject({ paid: false, paidAt: null });
  });

  it("lets the admin edit a sign-up, keeping the payment date while paid, and delete it", async () => {
    const db = createDb(env.DB);
    const id = await createRegistration(db, registrationInputSchema.parse({ ...form, whatsapp: "081111111111" }), 1);
    const edit = registrationEditSchema.parse({ ...form, whatsapp: "0822 2222 2222", classId: "tahfidz", wave: "2", paid: true });

    expect(edit).not.toHaveProperty("ikhwan");
    await updateRegistration(db, id, edit, null);
    const paid = await getRegistration(db, id);
    expect(paid).toMatchObject({ whatsapp: "6282222222222", classId: "tahfidz", wave: 2, paid: true });

    await updateRegistration(db, id, { ...edit, name: "Ahmad F." }, paid!.paidAt);
    expect((await getRegistration(db, id))?.paidAt).toEqual(paid!.paidAt);
    expect(await isAlreadyRegistered(db, "6282222222222", 2, id)).toBe(false);

    await deleteRegistration(db, id);
    expect(await getRegistration(db, id)).toBeNull();
  });
});
