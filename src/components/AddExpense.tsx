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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { expenseData } from "../utils/types";
import { expenseSchema } from "../utils/schema";
import { addExpenseAction } from "../redux/asyncAction/expenseAsyncAction";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 5,
      category: "",
      description: "",
    },
    resolver: yupResolver(expenseSchema),
  });

  const addExpenseHandler = async (data: expenseData) => {
    const response = await dispatch(addExpenseAction(data));
    const responseType = response?.type.split("/")[1];
    if (responseType === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 750,
        margin: "20px auto auto auto",
        border: "1px solid black",
      }}
    >
      <CardContent>
        <form noValidate onSubmit={handleSubmit(addExpenseHandler)}>
          <Typography variant="h5" align="center">
            Add New Expense
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
          {/* <TextField
            autoFocus
            required
            margin="normal"
            label="Category"
            type="select"
            fullWidth
            variant="outlined"
            {...register("category")}
            helperText={errors?.category?.message}
          /> */}
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
            Add Expense
          </Button>
        </form>{" "}
        <br />
      </CardContent>{" "}
    </Card>
  );
};

export default AddExpense;
