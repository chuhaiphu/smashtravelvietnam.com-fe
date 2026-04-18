import { getAllMenusActionPublic } from "@/actions/menu-action";
import { getAllTourCategoriesActionPublic } from "@/actions/tour-category-action";
import LandingDrawerContent from "./landing-drawer-content";

export default async function LandingDrawer() {
  const [menusResponse, tourCategoriesResponse] = await Promise.all([
    getAllMenusActionPublic(),
    getAllTourCategoriesActionPublic(),
  ]);

  return (
    <LandingDrawerContent
      menusData={menusResponse.data ?? []}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
    />
  );
}
