import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationCircle);
library.add(faCheckCircle);
dom.watch(); 

export default {
  methods: {
    toastedSuccess() {
      this.$toasted.success("Logged In", {
        className: "toast-success",
        icon: "check-circle",
        theme: "bubble",
        position: "top-right",
        duration: 2000,
      });
    },
    toastedError() {
      this.$toasted.error("Form not valid", {
        icon: "exclamation-circle",
        className: "toast-error",
        theme: "bubble",
        position: "top-center",
        duration: 2000,
      });
    }
  }
}
