import { getFocusedRouteNameFromRoute } from "@react-navigation/core";

const routes = ["AddTodo", "EditTodo"];

export function getTabBarVisible(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? ""
  if (routes.includes(routeName)) return false
  return true
}