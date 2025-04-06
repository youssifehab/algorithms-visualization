import { ProjectOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const items = [
  {
    key: "graph",
    icon: <ProjectOutlined />,
    label: <Link to="/graph">Graph</Link>,
    path: "/graph",
  },
  {
    key: "array",
    icon: <ProjectOutlined />,
    label: "Array ",
    children: [
      {
        key: "sorting",
        label: <Link to="/array/sorting">Sorting</Link>,
        path: "/array/sorting",
      },
      {
        key: "searching",
        label: <Link to="/array/searching">Searching</Link>,
        path: "/array/searching",
      },
    ],
  },
];
