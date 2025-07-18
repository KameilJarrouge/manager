"use client";

import ActivitiesTable from "@/app/_components/Calories/Activities/ActivitiesTable";
import ActivityModal from "@/app/_components/Calories/Activities/Modals/ActivityModal";
import FoodItemsTable from "@/app/_components/Calories/Food Items/FoodItemsTable";
import FoodItemModal from "@/app/_components/Calories/Food Items/Modals/FoodItemModal";
import MealsTable from "@/app/_components/Calories/Meals/MealsTable";
import MealModal from "@/app/_components/Calories/Meals/Modals/MealModal";
import PersonalInfoForm from "@/app/_components/Calories/PersonalInfoForm";
import TableNav from "@/app/_components/Calories/TableNav";
import TextField from "@/app/_components/Input/TextField";
import LoadingComponent from "@/app/_components/LoadingComponent";
import api from "@/app/_lib/api";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

function Calories() {
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
    <div className="w-full h-full relative px-[2rem]  overflow-x-hidden">
      {isLoading && <LoadingComponent />}
      {/* Modals */}
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
      <div className="flex gap-2 w-full">
        <PersonalInfoForm />
        <div className="w-[1px] bg-foreground/50"></div>
        <div className="flex flex-col gap-3 w-full ">
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
        </div>
      </div>
    </div>
  );
}

export default Calories;
