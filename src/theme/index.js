/**
 * ANTD CONFIGURATION
 *
 * Full configuration options:
 * https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
 *
 * **/
const ANTD_COLORS = {
  PRIMARY: "#1B63A9", // primary color for all components
  LINK: "#2B69A9", // link color
  SUCCESS: "#52c41a", // success state color
  WARNING: "#faad14", // warning state color
  ERROR: "#f5222d", // error state color
  GEEK_BLUE: "geekblue", //special blue AntD tags
  HEADING: "rgba(0, 0, 0, 0.85)", // heading text color
  TEXT_PRIMARY: "rgba(0, 0, 0, 0.65)", // major text color
  TEXT_SECONDARY: "#637487", // secondary text color
  DISABLED: "rgba(0, 0, 0, .25)", // disable state color
  BORDER: "#d9d9d9", // major border color
};

const GREY_COLORS = {
  GREY_S_70: "#161C22",
  GREY_S_50: "#242E39",
  GREY_S_30: "#324050",
  GREY_S_20: "#3A4A5B",
  GREY_S_10: "#415367",
  GREY_100: "#485C72",
  GREY_T_15: "#637487",
  GREY_T_25: "#768595",
  GREY_T_35: "#8895A3",
  GREY_T_50: "#A3ADB8",
  GREY_T_65: "#BFC6CE",
  GREY_T_75: "#D1D6DC",
  GREY_T_85: "#E4E7EA",
  GREY_T_92: "#F0F2F4",
  GREY_T_96: "#F8F8F9",
  GREY_T_98: "#FBFCFC",
  GREY_T_99: "#D1D1D1",
};

const GREEN_COLOR = {
  GREEN_PRIMARY: "green",
  GREEN_DARK: "#4cb187",
  GREEN_LIGHT: "#3d8e6c",
};

const ANTD_STYLES = {
  FONT_FAMILY: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  FONT_SIZE: "14px", // major text font size
  BORDER_RADIUS: "4px", // major border radius
  BOX_SHADOW: "0px 2px 10px rgba(99, 116, 135, 0.2)", // major shadow for layers
};

export const ANTD_THEME = {
  "primary-color": ANTD_COLORS.PRIMARY,
  "link-color": ANTD_COLORS.LINK,
  "success-color": ANTD_COLORS.SUCCESS,
  "warning-color": ANTD_COLORS.WARNING,
  "error-color": ANTD_COLORS.ERROR,
  "font-size-base": ANTD_STYLES.FONT_SIZE,
  "heading-color": ANTD_COLORS.HEADING,
  "text-color": ANTD_COLORS.TEXT_PRIMARY,
  "text-color-secondary": ANTD_COLORS.TEXT_SECONDARY,
  "disabled-color": ANTD_COLORS.DISABLED,
  "border-radius-base": ANTD_STYLES.BORDER_RADIUS,
  "border-color-base": ANTD_COLORS.BORDER,
  "box-shadow-base": ANTD_STYLES.BOX_SHADOW,
  "font-family": ANTD_STYLES.FONT_FAMILY,
  "btn-default-bg": "none",
  "table-header-bg": GREY_COLORS.GREY_T_85,
  "table-header-color": GREY_COLORS.GREY_T_25,
  "modal-header-bg": GREY_COLORS.GREY_T_85,
  "menu-item-color": GREY_COLORS.GREY_T_25,
  "menu-item-active-bg": GREY_COLORS.GREY_T_92,
  "menu-item-height": "52px!important",
  "popover-bg": GREY_COLORS.GREY_S_30,
  "popover-distance": "0px",
  "drawer-body-padding": "0px",
  "collapse-header-padding": "0px",
  "collapse-header-padding-extra": "0px",
  "collapse-content-padding": "20px",
  "label-color": GREY_COLORS.GREY_T_15,
  "btn-disable-bg": "none",
};

/**
 * CONFIGURE THEME HERE
 * **/
export const COLORS = {
  ...ANTD_COLORS,
  ...GREY_COLORS,
  ...GREEN_COLOR,
  EL_PRIMARY: "#4D4CAB",
  BACKGROUND_COLOR: GREY_COLORS.GREY_T_92,
  BORDER_COLOR: "#ccc",
};

export const STYLES = {
  ...ANTD_STYLES,
  CONTAINER_PADDING: 32,
};
