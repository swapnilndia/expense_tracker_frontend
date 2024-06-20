import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenseListAction,
  searchExpenseAction,
} from "../redux/asyncAction/expenseAsyncAction";
import { selectExpenseTableView } from "../redux/reducers/expenseReducer";

const HomepageSearchComponent = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const tableIvew = useSelector(selectExpenseTableView);
  const [searchText, setSearchText] = React.useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [categoryText, setCategoryText] = React.useState<string>("");
  const debouncedCategoryText = useDebounce(categoryText, 500);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryText(event.target.value as string);
  };

  const handleReset = () => {
    setSearchText("");
    setCategoryText("");
    dispatch(getExpenseListAction({ page: 0, rowsPerPage: 10 }));
  };

  const fetchSearchedList = async ({
    description,
    category,
  }: {
    description: string;
    category: string;
  }) => {
    await dispatch(searchExpenseAction({ description, category }));
  };

  useEffect(() => {
    if (debouncedCategoryText.length > 0 || debouncedSearchText.length > 0) {
      fetchSearchedList({
        description: debouncedSearchText,
        category: debouncedCategoryText,
      });
    }
  }, [debouncedSearchText, debouncedCategoryText]);

  return (
    <>
      {" "}
      {tableIvew === "10" && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            padding: "12px",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            gap={2}
          >
            <TextField
              value={searchText}
              fullWidth
              focused
              autoFocus
              onChange={handleSearchChange}
              placeholder="Search by description"
            ></TextField>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="category-select-label">
                Search By Category
              </InputLabel>
              <Select
                fullWidth
                labelId="category-select-label"
                label="Search By Category"
                onChange={handleCategoryChange}
                value={categoryText}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Housing (Rent/Mortgage)">
                  Housing (Rent/Mortgage)
                </MenuItem>
                <MenuItem value="Food and Groceries">
                  Food and Groceries
                </MenuItem>
                <MenuItem value="Utilities (Electricity, Water, Internet)">
                  Utilities (Electricity, Water, Internet)
                </MenuItem>
                <MenuItem value="Transportation (Fuel, Public Transit)">
                  Transportation (Fuel, Public Transit)
                </MenuItem>
                <MenuItem value="Healthcare (Insurance, Medical Bills)">
                  Healthcare (Insurance, Medical Bills)
                </MenuItem>
                <MenuItem value="Education (Tuition, Books)">
                  Education (Tuition, Books)
                </MenuItem>
                <MenuItem value="Entertainment (Movies, Subscriptions)">
                  Entertainment (Movies, Subscriptions)
                </MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Personal Care (Haircuts, Beauty Products)">
                  Personal Care (Haircuts, Beauty Products)
                </MenuItem>
                <MenuItem value="Miscellaneous (Gifts, Donations, Others)">
                  Miscellaneous (Gifts, Donations, Others)
                </MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/addExpense")}
            >
              + Add New Expense
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HomepageSearchComponent;
