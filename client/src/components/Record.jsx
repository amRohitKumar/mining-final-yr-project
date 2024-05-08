import ViewField from "@/components/ViewField";
import { Paper } from "@mui/material";
import moment from "moment";

export const RecordDirt = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        px: 4,
        py: 2,
        my: 2,
        width: "60%",
        display: "grid",
        gridTemplateColumns: "1fr 0.7fr 1fr",
        columnGap: "1em",
        fontSize: "1.1em",
        backgroundColor: props.call_verdict === "dirty" ? "#f8d7da" : "#d4edda",
      }}
    >
      <ViewField
        title="Timestamp"
        value={moment(props.call_timestamp).format("MMMM Do YYYY, h:mm:ss a")}
      />
      <ViewField
        title="Verdict"
        value={props.call_verdict}
        style={{ textTransform: "capitalize" }}
      />
      <ViewField title="Probability" value={props.call_prob.toFixed(2)} />
    </Paper>
  );
};

export const RecordTear = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        px: 4,
        py: 2,
        my: 2,
        width: "60%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        columnGap: "1em",
        fontSize: "1.1em",
        backgroundColor:
          props.severity === "low"
            ? "#d4edda"
            : props.severity === "medium"
            ? "#ecf4c6"
            : "#f8d7da",
      }}
    >
      <ViewField
        title="Timestamp"
        value={moment(props.call_timestamp).format("MMMM Do YYYY, h:mm:ss a")}
      />
      <ViewField title="Point" value={props.point} />
      <ViewField
        title="Severity"
        value={props?.severity}
        style={{ textTransform: "capitalize" }}
        />
      <ViewField
        title="Wear type"
        value={props?.wear_type}
        style={{ textTransform: "capitalize" }}
      />
    </Paper>
  );
};
