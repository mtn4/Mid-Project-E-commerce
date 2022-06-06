const paramTitle = (str) => {
  if (str.trim().indexOf(" ") !== -1) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getPageTitle = (str) => {
  let title = "All Products";
  if (str) {
    switch (str) {
      case "audio":
        title = "Audio";
        break;
      case "cellphones":
        title = "Cellphones";
        break;
      case "computers":
        title = "Computers";
        break;
      case "videogames":
        title = "Video Games";
        break;
      default:
        title = "Search Results: " + paramTitle(str);
        break;
    }
  }
  return title;
};

export default getPageTitle;
