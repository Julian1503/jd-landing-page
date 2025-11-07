import {
  NAV_ANIMATION_STYLE,
  NAV_BUTTON_BASE_CLASS,
  NAV_CONTENT_CLASS,
  NAV_CONTENT_MAIN_CLASS,
  NAV_ARROW_CLASS,
  NAV_ICON_CLASS,
  NAV_LINK_CARD_CLASS,
  NAV_POPUP_CLASS,
  NAV_POSITIONER_CLASS,
  NAV_TRIGGER_CLASS,
  MOBILE_NAV_ITEM_CLASS,
  MOBILE_SECTION_TITLE_CLASS,
} from "@/components/ui/navbar/constants";
import {
  determineLayout,
  generateLinkKey,
  getContainerClass,
  getStaggerDelay,
} from "@/components/ui/navbar/utils";

describe("Navbar constants and utilities", () => {
  it("exposes the styling tokens", () => {
    expect(NAV_TRIGGER_CLASS).toContain("flex");
    expect(NAV_LINK_CARD_CLASS).toContain("rounded-md");
    expect(NAV_CONTENT_CLASS).toContain("transition");
    expect(NAV_CONTENT_MAIN_CLASS).toContain("data-[activation-direction=left]");
    expect(NAV_POSITIONER_CLASS).toContain("transition");
    expect(NAV_POPUP_CLASS).toContain("rounded-lg");
    expect(NAV_ARROW_CLASS).toBeDefined();
    expect(NAV_ICON_CLASS).toContain("transition-colors");
    expect(NAV_BUTTON_BASE_CLASS).toContain("items-center");
    expect(MOBILE_SECTION_TITLE_CLASS).toContain("uppercase");
    expect(MOBILE_NAV_ITEM_CLASS).toContain("hover:bg");
    expect(NAV_ANIMATION_STYLE["--duration"]).toBe("0.35s");
  });

  it("computes layout helpers", () => {
    expect(getContainerClass("list", 2)).toContain("flex");
    expect(getContainerClass("grid", 3)).toContain("sm:grid-cols");
    expect(determineLayout([{ title: "A" }], "auto")).toBe("grid");
    expect(determineLayout(new Array(6).fill({ title: "A" }), "auto")).toBe("list");
    expect(determineLayout([], "list")).toBe("list");
    expect(generateLinkKey("/docs", 1)).toBe("/docs-1");
    expect(getStaggerDelay(3)).toBeCloseTo(0.3);
  });
});
