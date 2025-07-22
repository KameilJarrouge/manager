import React, { useEffect, useState } from "react";
import TableNav from "./Table/TableNav";
import { GoPlus } from "react-icons/go";
import TextField from "../Input/TextField";
import FoodItemsTable from "./Food Items/FoodItemsTable";
import MealsTable from "./Meals/MealsTable";
import ActivitiesTable from "./Activities/ActivitiesTable";
import LoadingComponent from "../LoadingComponent";
import ActivityModal from "./Activities/Modals/ActivityModal";
import FoodItemModal from "./Food Items/Modals/FoodItemModal";
import MealModal from "./Meals/Modals/MealModal";
import api from "@/app/_lib/api";

function MainCaloriesTable() {
  const [meals, setMeals] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [activities, setActivities] = useState([]);

  const handleGetMeals = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/meals");
    setIsLoading(false);
    if (result.data.success) {
      setMeals(result.data.result);
    }
  };
  const handleGetFoodItems = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/food-items");
    setIsLoading(false);
    if (result.data.success) {
      setFoodItems(result.data.result);
    }
  };
  const handleGetActivities = async () => {
    setIsLoading(true);
    const result = await api.get("/calories/activities");
    setIsLoading(false);
    if (result.data.success) {
      setActivities(result.data.result);
    }
  };

  useEffect(() => {
    handleGetMeals();
    handleGetFoodItems();
    handleGetActivities();
  }, []);

  const [filterKey, setFilterKey] = useState("test");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTable, setSelectedTable] = useState("Food Items");

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [isFoodItemModalOpen, setIsFoodItemModalOpen] = useState(false);

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);

  const handleAddButton = () => {
    switch (selectedTable) {
      case "Food Items":
        setSelectedFoodItem(null);
        setIsFoodItemModalOpen(true);
        break;
      case "Meals":
        setSelectedMeal(null);
        setIsMealModalOpen(true);
        break;
      case "Activities":
        setSelectedActivity(null);
        setIsActivityModalOpen(true);
        break;
    }
  };

  useEffect(() => {
    setFilterKey("");
  }, [selectedTable]);

  return (
    <div className="flex flex-col gap-3 w-full relative ">
      {isLoading && <LoadingComponent />}
      {/* Modals */}

      <div className="flex items-center justify-between">
        <TableNav
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddButton}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <GoPlus className="w-[1.5rem] h-fit" strokeWidth={1} />
          </button>
          <TextField
            placeholder={"filter table"}
            state={filterKey}
            setState={setFilterKey}
          />
        </div>
      </div>
      {
        {
          "Food Items": (
            <FoodItemsTable
              filterKey={filterKey}
              foodItems={foodItems}
              setSelected={(selectedFoodItem) => {
                setSelectedFoodItem(selectedFoodItem);
                setIsFoodItemModalOpen(true);
              }}
            />
          ),
          Meals: (
            <MealsTable
              filterKey={filterKey}
              meals={meals}
              setSelected={(selectedMeal) => {
                setSelectedMeal(selectedMeal);
                setIsMealModalOpen(true);
              }}
            />
          ),
          Activities: (
            <ActivitiesTable
              setSelected={(selectedActivity) => {
                setSelectedActivity(selectedActivity);
                setIsActivityModalOpen(true);
              }}
              filterKey={filterKey}
              activities={activities}
            />
          ),
        }[selectedTable]
      }
      <>
        <ActivityModal
          activity={selectedActivity}
          isOpen={isActivityModalOpen}
          close={(triggerRefresh = false) => {
            setIsActivityModalOpen(false);
            if (triggerRefresh) handleGetActivities();
          }}
        />
        <FoodItemModal
          foodItem={selectedFoodItem}
          isOpen={isFoodItemModalOpen}
          close={(triggerRefresh = false) => {
            setIsFoodItemModalOpen(false);
            if (triggerRefresh) handleGetFoodItems();
          }}
        />
        <MealModal
          meal={selectedMeal}
          isOpen={isMealModalOpen}
          close={(triggerRefresh = false) => {
            setIsMealModalOpen(false);
            if (triggerRefresh) handleGetMeals();
          }}
        />
      </>
    </div>
  );
}

export default MainCaloriesTable;
