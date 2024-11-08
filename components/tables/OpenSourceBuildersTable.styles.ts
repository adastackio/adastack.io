import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

// export const useTableStyles = createStyles(({ token, css }) => ({
//   customTable: css`
//     .ant-table {
//       .ant-table-container {
//         overflow-x: auto;
//         width: 100%;

//         .ant-table-body {
//           overflow-x: auto;
//           scrollbar-width: thin;
//           scrollbar-color: ${token.colorBorderSecondary} transparent;
//         }
//       }
//     }
//   `,
// }));


