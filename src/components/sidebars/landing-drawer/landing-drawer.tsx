import { getAllMenusAction } from "@/actions/menu-action";
import { getAllTourCategoriesAction } from "@/actions/tour-category-action";
import LandingDrawerContainer from "./landing-drawer-container";

export default async function LandingDrawer() {
  const [menusResponse, tourCategoriesResponse] = await Promise.all([
    getAllMenusAction(),
    getAllTourCategoriesAction(),
  ]);

  return (
    <LandingDrawerContainer
      menusData={menusResponse.data ?? []}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
    />
  );
}
