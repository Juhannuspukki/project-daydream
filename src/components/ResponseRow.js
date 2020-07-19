import React, { useState } from "react";
import { ButtonGroup, Button } from "reactstrap";

const key = {
  L: "Laudatur",
  E: "Eximia Cum Laude Approbatur",
  M: "Magna Cum Laude Approbatur",
  C: "Cum Laude Approbatur",
  B: "Lubenter Approbatur",
  A: "Approbatur",
  I: "Improbatur",
};

const ResponseRow = (props) => {
  const [visible, setVisible] = useState(false);
  const { instance } = props;
  return (
    <>
      <tr
        onClick={() => setVisible(!visible)}
        className={instance.response ? "Pointer" : undefined}
      >
        <td>{instance.year}</td>
        <td>{instance.period}</td>
        <td>{instance.sampleSize}</td>
        <td>
          {instance.work > 0 && "+"}
          {instance.work}%
        </td>
        <td>{instance.grade}</td>
        <td>
          {instance.letter
            ? `${instance.letter} - ${key[instance.letter]}`
            : "-"}
        </td>
        <td className={"Res"}>{instance.response && "✓"}</td>
      </tr>
      {instance.response && (
        <tr className={visible ? undefined : "Hidden"}>
          <td colSpan={7} className={"Response-Content"}>
            {instance.response}
          </td>
        </tr>
      )}
    </>
  );
};

export default ResponseRow;
