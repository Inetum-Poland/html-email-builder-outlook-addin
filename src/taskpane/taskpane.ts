/* global Office */

import { countBytes, formatBytes } from "./utils";

const SIZE_LIMIT = 1_000_000;

Office.onReady((info) => {
  if (info.host !== Office.HostType.Outlook) {
    return;
  }

  const input = document.querySelector("#html-input") as HTMLInputElement;
  const button = document.querySelector("#insert") as HTMLButtonElement;

  input.oninput = onInput;
  button.onclick = onClick;
});

const onInput = () => {
  const html = document.querySelector("#html-input") as HTMLInputElement;
  const value = html.value;
  const bytes = countBytes(value);

  handleInfo(bytes);
  handleButton(value, bytes);
};

const onClick = () => {
  const html = document.querySelector("#html-input") as HTMLInputElement;
  const value = html.value;

  insert(value);
};

const handleButton = (html: string, bytes: number) => {
  const input = document.querySelector("#insert") as HTMLButtonElement;
  const isEmpty = !html.trim();
  const isTooLong = bytes > SIZE_LIMIT;

  input.disabled = isEmpty || isTooLong;
};

const handleError = ({ message, info }: { message?: string; info?: string }) => {
  const element = document.querySelector("#error") as HTMLElement;

  element.innerText = message ?? "Invalid input";

  if (info) {
    element.title = info;
  }
};

const clearError = () => {
  const element = document.querySelector("#error") as HTMLElement;

  element.title = "";
  element.innerText = "";
};

const handleInfo = (bytes: number) => {
  const info = document.querySelector("#info") as HTMLElement;

  info.title = `${bytes} ${bytes === 1 ? "byte" : "bytes"}`;
  info.innerText = formatBytes(bytes);

  if (bytes > SIZE_LIMIT) {
    handleError({ message: "Exceeds size limit (1 MB)." });
    return;
  }

  clearError();
};

const insert = async (body: string) => {
  const isEmpty = !body.trim();

  if (isEmpty) {
    return;
  }

  const coercionType = Office.CoercionType.Html;

  try {
    Office.context.mailbox.item?.body.setSelectedDataAsync(body, { coercionType }, (result) => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        handleError({ info: result.error.message });
        return;
      }

      clearError();
    });
  } catch (error: any) {
    handleError({ info: error.message });
  }
};
