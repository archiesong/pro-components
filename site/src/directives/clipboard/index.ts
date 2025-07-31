import Clipboard from "./clipboard"; // FIXME: workaround for browserify

const VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true, // This fixes IE, see #50
};

const VueClipboard = {
  install(app) {
    app.directive("clipboard", {
      mounted(el, binding) {
        if (binding.arg === "success") {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === "error") {
          el._vClipboard_error = binding.value;
        } else {
          const clipboard = new Clipboard(el, {
            text() {
              return binding.value;
            },
            action() {
              return binding.arg === "cut" ? "cut" : "copy";
            },
            container: VueClipboardConfig.autoSetContainer ? el : undefined,
          });
          clipboard.on("success", function (e) {
            const callback = el._vClipboard_success;
            callback && callback(e);
          });
          clipboard.on("error", function (e) {
            const callback = el._vClipboard_error;
            callback && callback(e);
          });
          el._vClipboard = clipboard;
        }
      },
      updated(el, binding) {
        if (binding.arg === "success") {
          el._vClipboard_success = binding.value;
        } else if (binding.arg === "error") {
          el._vClipboard_error = binding.value;
        } else {
          el._vClipboard.text = function () {
            return binding.value;
          };
          el._vClipboard.action = function () {
            return binding.arg === "cut" ? "cut" : "copy";
          };
        }
      },
      unmounted(el, binding) {
        if (binding.arg === "success") {
          delete el._vClipboard_success;
        } else if (binding.arg === "error") {
          delete el._vClipboard_error;
        } else {
          el._vClipboard.destroy();
          delete el._vClipboard;
        }
      },
    });
  },
};

export default VueClipboard;
