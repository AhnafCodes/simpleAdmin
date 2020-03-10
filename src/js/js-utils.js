/*DOM utils*/
export function addExpandCollapseBehavior(
  buttonElement,
  toggleClassesObj,
  toggleHandler
) {
  const regionElement = document.getElementById(
    buttonElement.getAttribute("aria-controls")
  );
  //binding events;
  toggleHandler = toggleHandler || expandCollapseToggleHandler;
  buttonElement.addEventListener("click", e => {
    toggleHandler(buttonElement, regionElement, toggleClassesObj);
    e.stopPropagation();
    return false;
  });
  buttonElement.addEventListener("keydown", e => {
    if (e.key === "Control" || e.key === "Enter") {
      //as key numbers are being depricated
      toggleHandler(buttonElement, regionElement, toggleClassesObj);
      e.stopPropagation();
      return false;
    }
  });
}

function expandCollapseToggleHandler(
  buttonElement,
  regionElement,
  toggleClassObj
) {
  toggleAriaState(buttonElement, "aria-pressed");
  const shouldSetFocus = toggleAriaState(regionElement, "aria-expanded");
  shouldSetFocus && regionElement.focus();
  toggleClasses(toggleClassObj);
}

function toggleClasses(toggleClassObj) {
  // Sample toggleClassObj
  // {
  //     "#main-menu": ["hidden","expand",""],
  //     ".test": ["small", "big"]
  // }
  Object.entries(toggleClassObj).forEach(([selector, classesToToggle]) => {
    const element = document.querySelector(selector);
    classesToToggle.forEach(className => toggleClass(className, element));
  });
}
function toggleAriaState(element, state) {
  if (element.getAttribute(state) == "false") {
    element.setAttribute(state, "true");
    return true;
  } else {
    // region is expanded
    element.setAttribute(state, "false");
  }
}

export function toggleClass(className, element) {
  element.classList.contains(className)
    ? element.classList.remove(className)
    : element.classList.add(className);
}

export const swapClass = (className1, className2, element) => {
  if (element.classList.contains(className1)) {
    element.classList.replace(className1, className2);
  } else if (element.classList.contains(className2)) {
    element.classList.replace(className2, className1);
  }
};

/*service utils*/
export const getCookie = name => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts
      .pop()
      .split(";")
      .shift();
  }
};

export const postData = (queryPath, data, jsonCallback, selector) => {
  fetch(`${window.location.host}/${queryPath}`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    if (jsonCallback) {
      return response.json().then(responseJson => jsonCallback(responseJson));
    }
    if (selector) {
      return response.text().then(function(text) {
        let domNode = document.querySelector(selector);
        domNode.innerHTML = text;
      });
    }
  });
};

export const getData = async queryString => {
  try {
    const res = await fetch(`${window.location.host}/${queryString}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken")
      }
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
