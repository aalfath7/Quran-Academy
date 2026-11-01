import { describe, expect, it } from "vitest";
import { ADMIN_WHATSAPP, isRegistrationOpen, registrationLink, validateRegistration } from "../src/lib/class-offer";

const form = { name: " Ahmad Fauzi ", age: "21", scheduleId: "selasa", readingLevel: "terbata", notes: "  ", ikhwan: true };

describe("registration validation", () => {
  it("accepts a filled form", () => {
    expect(validateRegistration(form)).toEqual({});
  });

  it("flags every invalid field", () => {
    const errors = validateRegistration({ name: "A", age: "", scheduleId: "", readingLevel: "", notes: "", ikhwan: false });

    expect(Object.keys(errors).sort()).toEqual(["age", "ikhwan", "name", "readingLevel", "scheduleId"]);
  });

  it("enforces the minimum age and rejects non-integers", () => {
    expect(validateRegistration({ ...form, age: "13" }).age).toBeUndefined();
    expect(validateRegistration({ ...form, age: "12" }).age).toContain("13 tahun");
    expect(validateRegistration({ ...form, age: "21.5" }).age).toBeDefined();
  });

  it("rejects a schedule that is not on offer", () => {
    expect(validateRegistration({ ...form, scheduleId: "senin" }).scheduleId).toBeDefined();
  });
});

describe("registration link", () => {
  const messageOf = (link: string) => new URL(link).searchParams.get("text");

  it("writes the sign-up into a WhatsApp message to the admin", () => {
    const link = registrationLink(form);

    expect(link.startsWith(`https://wa.me/${ADMIN_WHATSAPP}?text=`)).toBe(true);
    expect(messageOf(link)).toContain("Nama: Ahmad Fauzi\n");
    expect(messageOf(link)).toContain("Usia: 21 tahun\n");
    expect(messageOf(link)).toContain("Jadwal: Selasa · ba'da Isya (19.30–20.30 WIB)\n");
    expect(messageOf(link)).toContain("Kemampuan membaca: Bisa membaca, tapi masih terbata-bata\n");
  });

  it("includes notes only when filled in, and survives reserved URL characters", () => {
    expect(messageOf(registrationLink(form))).not.toContain("Catatan:");
    expect(messageOf(registrationLink({ ...form, notes: "makhraj & mad #1" }))).toContain("Catatan: makhraj & mad #1\n");
  });
});

describe("registration deadline", () => {
  it("stays open through the last day in WIB", () => {
    expect(isRegistrationOpen(new Date("2026-11-13T23:59:59+07:00"))).toBe(true);
    expect(isRegistrationOpen(new Date("2026-11-14T00:00:00+07:00"))).toBe(false);
  });
});
