const tabcontainer = document.getElementById("tabcontainer");
      const tabs = document.getElementById("tabs");
      const x = document.getElementById("x");
      const plus = document.getElementById("plus");
      let activeTabs = [];
      let activeIframes = [];
      function createTab() {
        const tab = document.createElement("button");
        const iframe = document.createElement("iframe");
        tab.textContent = "Loading..";
        iframe.src = "/";
        iframe.onload = function () {
          tab.textContent = iframe.contentWindow.document.title;
        };
        tab.id += "tab";
        tabcontainer.appendChild(iframe);
        tabs.appendChild(tab);
        tab.addEventListener("click", function () {
          activateTab(tab, iframe);
        });
        activateTab(tab, iframe);
      }
      function activateTab(tab, iframe) {
        activeTabs.forEach((tab) => tab.classList.remove("active"));
        activeIframes.forEach((iframe) =>
          iframe.classList.remove("active-iframe")
        );
        activeIframes = activeIframes.filter((item) => item !== iframe);
        activeTabs = activeTabs.filter((item) => item !== tab);
        activeTabs.push(tab);
        activeIframes.push(iframe);
        tab.classList.add("active");
        iframe.classList.add("active-iframe");
      }
      plus.addEventListener("click", createTab);
      x.addEventListener("click", function () {
        const activeTab = activeTabs.pop();
        const activeIframe = activeIframes.pop();
        if (activeTab && activeIframe) {
          activeTab.classList.remove("active");
          activeIframe.classList.remove("active-iframe");
          activeIframe.remove();
          activeTab.remove();
          if (activeTabs.length > 0) {
            const lastTab = activeTabs[activeTabs.length - 1];
            const lastIframe = activeIframes[activeIframes.length - 1];
            activateTab(lastTab, lastIframe);
          }
        }
      });
      window.addEventListener("load", createTab);
