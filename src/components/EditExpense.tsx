import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { expenseData, updateExpenseData } from "../utils/types";
import { expenseSchema } from "../utils/schema";
import {
  getSpecificExpenseAction,
  updateExpenseAction,
} from "../redux/asyncAction/expenseAsyncAction";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { selectSpecificExpense } from "../redux/reducers/expenseReducer";

const EditExpense = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const selectedExpense = useSelector(selectSpecificExpense);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(expenseSchema),
  });

  const updateExpenseHandler = async (data: expenseData) => {
    if (expenseId) {
      const editExpenseId = +expenseId;
      const updateExpenseData: updateExpenseData = {
        ...data,
        expenseId: editExpenseId,
      };
      const response = await dispatch(updateExpenseAction(updateExpenseData));
      const responseType = response?.type.split("/")[1];
      if (responseType === "fulfilled") {
        navigate("/");
      }
    }
  };

  const getSpecificExpenseHandler = async (expenseId: number) => {
    await dispatch(getSpecificExpenseAction(expenseId));
  };

  useEffect(() => {
    if (selectedExpense === null && expenseId) {
      getSpecificExpenseHandler(+expenseId);
    } else if (selectedExpense) {
      reset({
        price: selectedExpense.price,
        category: selectedExpense.category,
        description: selectedExpense.description,
      });
    }
  }, [selectedExpense, expenseId]);

  return (
    <Card
      sx={{
        maxWidth: 750,
        margin: "20px auto auto auto",
        border: "1px solid black",
      }}
    >
      <CardContent>
        <form noValidate onSubmit={handleSubmit(updateExpenseHandler)}>
          <Typography variant="h5" align="center">
            Update Expense
          </Typography>
          <TextField
            autoFocus
            required
            margin="normal"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            {...register("price")}
            helperText={errors?.price?.message}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="category-select-label"
                  label="Category"
                  variant="outlined"
                  {...field}
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
              )}
            />
            {errors.category && (
              <FormHelperText>{errors.category.message}</FormHelperText>
            )}
          </FormControl>
          <TextField
            autoFocus
            required
            multiline
            margin="normal"
            label="Description"
            type="description"
            fullWidth
            variant="outlined"
            {...register("description")}
            helperText={errors?.description?.message}
          />{" "}
          <Button variant="contained" type="submit" fullWidth>
            Update Expense
          </Button>
        </form>{" "}
        <br />
      </CardContent>{" "}
    </Card>
  );
};

export default EditExpense;
