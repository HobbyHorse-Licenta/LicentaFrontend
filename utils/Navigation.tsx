
class Navigation {
  
  ShouldHaveTabBar = (route: string) => {
    const routesThatShouldHaveTabBar = ["Events", "Maps", "MyEvents", "MyProfile", "MySchedules"];

    if(route == undefined)
      return true;
    if(routesThatShouldHaveTabBar.find((r) => r === route) == undefined)
      return false;
    else return true;
  }

  
  }
  const navigationUtils = new Navigation();
  export default navigationUtils;




