
document.addEventListener('DOMContentLoaded', function () {

  var hasClass = function(el, className) {
		if (el.classList) {
			return el.classList.contains(className);
		} else {
			return new RegExp("\\b" + className + "\\b").test(el.className);
    }
	}
  var addClass = function(el, className) {
		if (el.classList) {
			return el.classList.add(className);
		} else if (!hasClass(el, className)) {
			return (el.className += " " + className);
		}
	};
	var removeClass = function(el, className) {
		if (el.classList) {
			return el.classList.remove(className);
		} else {
			return (el.className = el.className.replace(
				new RegExp("\\b" + className + "\\b", "g"),
				""
			));
		}
	};
  var hide = function(el) {
  	el.style.display = "none";
	};
  var show = function(el) {
		el.style.display = "block";
	};
  var click = function(el, handler) {
		if (!el.eventListener) {
			el.eventListener = true;
			return el.addEventListener("click", handler);
		}
	};
  var toggleTab = function(el) {
  	var links = el.target.parentNode.parentNode;
  	var linksEl = links.querySelectorAll("li");
  	for (var i = 0; i < linksEl.length; i++) {
  		var l = linksEl[i];
  		removeClass(l, "is-active");
  		hide(document.querySelector(l.firstChild.getAttribute("data-tab")));
  	}
  	addClass(el.target.parentNode, "is-active");
  	show(document.querySelector(el.target.getAttribute("data-tab")));
  };
  var toggleTabMenu = function(el) {
  	var links = el.target.parentNode.parentNode;
  	var linksEl = links.querySelectorAll("a");
  	for (var i = 0; i < linksEl.length; i++) {
  		var l = linksEl[i];
  		removeClass(l, "is-active");
  		hide(document.querySelector(l.getAttribute("data-tab")));
  	}
  	addClass(el.target, "is-active");
  	show(document.querySelector(el.target.getAttribute("data-tab")));
  };


  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  var $tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs'), 0);
  if ($tabs && $tabs.length > 0) {
    $tabs.forEach(function ($el) {
      targets = $el.querySelectorAll('[data-tab]');
      // console.log('targets', targets);
      for (j = 0, len1 = targets.length; j < len1; j++) {
        target = targets[j];
        tab = document.querySelector(target.getAttribute('data-tab'));
        console.log('tab', tab)
        if (hasClass(target.parentNode, 'is-active') === false) {
          hide(tab);
        }
        click(target, toggleTab);
      }
    });
  }

  // these are side menus that act like tabs
  var $tabMenus = Array.prototype.slice.call(document.querySelectorAll('.tab-menu'), 0);
  if ($tabMenus && $tabMenus.length > 0) {
    $tabMenus.forEach(function ($el) {
      targets = $el.querySelectorAll('[data-tab]');
      // console.log('targets', targets);
      for (j = 0, len1 = targets.length; j < len1; j++) {
        target = targets[j];
        tabs = document.querySelector(target.getAttribute('data-tab'));
        if (tabs.length) { // selector is a class, it has many
          tabs.forEach(function (tab) {
            if (hasClass(target.parentNode, 'is-active') === false) {
              hide(tab);
            }
          })
        } else { // selector is an ID, it has one
          if (hasClass(target.parentNode, 'is-active') === false) {
            hide(tab);
          }
        }

        click(target, toggleTabMenu);
      }
    });
  }



});
