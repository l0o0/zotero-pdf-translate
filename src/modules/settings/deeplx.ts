import { getString } from "../../utils/locale";
import { getPref, setPref } from "../../utils/prefs";

export async function deeplxStatusCallback(status: boolean) {
  const dialog = new ztoolkit.Dialog(4, 1);
  const dialogData: { [key: string | number]: any } = {
    endpoint: getPref("deeplx.endpoint"),
  };
  dialog
    .setDialogData(dialogData)
    .addCell(0, 0, {
      tag: "label",
      namespace: "html",
      attributes: {
        for: "endpoint",
      },
      properties: {
        innerHTML: getString("service-deeplx-dialog-endPoint"),
      },
    })
    .addCell(1, 0, {
      tag: "input",
      id: "endpoint",
      attributes: {
        "data-bind": "endpoint",
        "data-prop": "value",
      },
    })
    .addButton(getString("service-deeplx-dialog-save"), "save")
    .addButton(getString("service-deeplx-dialog-close"), "close")
    .open(getString("service-deeplx-dialog-title"));

  await dialogData.unloadLock?.promise;
  switch (dialogData._lastButtonId) {
    case "save":
      {
        setPref("deeplx.endpoint", dialogData.endpoint);
      }
      break;
    default:
      break;
  }
}
