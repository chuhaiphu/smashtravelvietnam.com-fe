import { getAllPublicMenusAction } from "@/actions/menu-action";
import { getAllTourCategoriesPublicAction } from "@/actions/tour-category-action";
import LandingDrawerContainer from "./landing-drawer-container";

export default async function LandingDrawer() {
  const [menusResponse, tourCategoriesResponse] = await Promise.all([
    getAllPublicMenusAction(),
    getAllTourCategoriesPublicAction(),
  ]);

  return (
    <LandingDrawerContainer
      menusData={menusResponse.data ?? []}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
    />
  );
}
