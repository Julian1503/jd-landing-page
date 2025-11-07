import { act, renderHook } from "@testing-library/react";
import { useNavbarNavigation } from "@/hooks/useNavbarNavigation";
import type { MobileNavigationItem } from "@/components/ui/navbar/types";

describe("useNavbarNavigation", () => {
  const productItem: MobileNavigationItem = {
    title: "Products",
    children: [
      { title: "Analytics" },
      { title: "Automation" },
    ],
  };

  it("navigates forward, backward and resets", () => {
    const { result } = renderHook(() => useNavbarNavigation());

    expect(result.current.navigationState.currentItem).toBeNull();

    act(() => {
      result.current.navigateBack();
    });

    expect(result.current.navigationState).toEqual({ currentItem: null, history: [] });

    act(() => {
      result.current.navigateToSubmenu(productItem);
    });

    expect(result.current.navigationState.currentItem).toEqual(productItem);
    expect(result.current.navigationState.history).toHaveLength(0);

    act(() => {
      result.current.navigateToSubmenu({ title: "Deep", children: [] });
    });

    expect(result.current.navigationState.history).toHaveLength(1);

    act(() => {
      result.current.navigateBack();
    });

    expect(result.current.navigationState.currentItem).toEqual(productItem);

    act(() => {
      result.current.resetNavigation();
    });

    expect(result.current.navigationState).toEqual({ currentItem: null, history: [] });
  });
});
