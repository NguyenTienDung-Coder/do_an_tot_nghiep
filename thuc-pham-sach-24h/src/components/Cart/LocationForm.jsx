import Select from "react-select";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  root: {},
  formRow: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
  },
  labelForm: {
    color: "#222",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1.4",
  },
});

const customStyles = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: "none",
    height: "2.5em",
    fontSize: "13px",
    color: "#333",
    marginTop: "3px",
    border: state.isSelected ? "inherit" : "1px solid #ddd",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "#333",
    backgroundColor: state.isSelected ? "#0073aa" : "transparent",
    padding: 10,
    fontSize: "13px",
    cursor: "pointer",
  }),
};

function LocationForm(props) {
  const classes = useStyles();
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
    onCitySelect,
    onDistrictSelect,
    onWardSelect,
    onSubmit,
  } = props;

  return (
    <>
      <p className={classes.formRow}>
        <label htmlFor="cityId" className={classes.labelForm}>
          Tỉnh/Thành phố *
        </label>
        <Select
          name="cityId"
          key={`cityId_${selectedCity?.value}`}
          // isDisabled={cityOptions.length === 0}
          options={cityOptions}
          onChange={(option) => onCitySelect(option)}
          placeholder="Tỉnh/Thành"
          defaultValue={selectedCity}
          styles={customStyles}
        />
      </p>
      <p className={classes.formRow}>
        <label htmlFor="districtId" className={classes.labelForm}>
          Quận/Huyện *
        </label>
        <Select
          name="districtId"
          key={`districtId_${selectedDistrict?.value}`}
          // isDisabled={districtOptions.length === 0}
          options={districtOptions}
          onChange={(option) => onDistrictSelect(option)}
          placeholder="Quận/Huyện"
          defaultValue={selectedDistrict}
          styles={customStyles}
        />
      </p>

      <p className={classes.formRow}>
        <label htmlFor="districtId" className={classes.labelForm}>
          Xã/Phường (tuỳ chọn) *
        </label>
        <Select
          name="wardId"
          key={`wardId_${selectedWard?.value}`}
          // isDisabled={wardOptions.length === 0}
          options={wardOptions}
          placeholder="Phường/Xã"
          onChange={(option) => onWardSelect(option)}
          defaultValue={selectedWard}
          styles={customStyles}
        />
      </p>
    </>
  );
}

export default LocationForm;
