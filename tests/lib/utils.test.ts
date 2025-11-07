import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names intelligently", () => {
    expect(cn("p-2", null, "text-sm", { hidden: false, block: true })).toBe("p-2 text-sm block");
  });
});
