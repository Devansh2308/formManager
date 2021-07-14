import { GridSize } from "@material-ui/core";
import React from "react";

export type SettingComponentType =
  | "align"
  | "backgroundColor"
  | "border"
  | "borderColor"
  | "borderRadius"
  | "buttonType"
  | "color"
  | "fontColor"
  | "fontFamily"
  | "fontWeight"
  | "height"
  | "image"
  | "imagePadding"
  | "linkColor"
  | "padding"
  | "size"
  | "space"
  | "spacing"
  | "textAlign"
  | "url"
  | "verticalAlign"
  | "width"
  | "labeledTextInput"
  | "labeledNumberInput"
  | "labeledSwitch"
  | "inputValidation"
  | "multilineValidation"
  | "inputOptions";

export type TComponentSettings = {
  type: SettingComponentType;
  grid?: GridSize;
  id: string;
  label?: React.ReactElement;
};

export type InitialValues = {
  label?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

export type renderSettingsProps = {
  settings?: {
    [key: string]: any;
  };
  onSave?: (
    settings: renderSettingsProps
  ) => void;
};

export type TComponentType = {
  component: (
    props: renderSettingsProps
  ) => React.ReactNode;
  componentSettings: TComponentSettings[];
  initialValue?: InitialValues | null;
  type: Element;
  itemName: React.ReactNode;
  icon: React.ReactNode;
  renderSettings: (
    props: renderSettingsProps
  ) => React.ReactElement<any, any>;
};

export type Element =
  | "INPUT"
  | "BUTTON"
  | "MULTI_LINE_INPUT"
  | "NUMBER_INPUT"
  | "DATE_PICKER"
  | "DATE_TIME_PICKER"
  | "SLIDER"
  | "SWITCHER"
  | "TELEPHONE"
  | "COLOR_PICKER"
  | "TIME_PICKER"
  | "TELEPHONE"
  | "RADIO_BUTTON"
  | "CHECKBOX";

export type TStateItem = {
  id: string;
  element: Element;
  settings?: renderSettingsProps;
};

export type FormBuilderState = {
  items: TStateItem[];
  selected?: string;
};

export interface FormBuilderContextProps {
  builderState: FormBuilderState | null;
  formElementsMap: TComponentType[] | null;
  setBuilderState: React.Dispatch<
    React.SetStateAction<FormBuilderState>
  >;
}

export interface FormRenderContextProps {
  renderState: FormBuilderState | null;
}
