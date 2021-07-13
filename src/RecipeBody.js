import React, { Component } from "react";
import Axios from "axios";
import "./css/recipe-body.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RecipeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: [],
    };
  }

  // code to search the recipe from the MealDB api

  componentDidMount() {
    if (this.props.foodItem === "") alert("Enter a Dish!!");
    else {
      Axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
        this.props.foodItem
      ).then((resolve) => {
        this.setState({
          meal: resolve.data.meals,
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.foodItem !== prevProps.foodItem) {
      if (this.props.foodItem === "") alert("Enter a Dish!!");
      else {
        Axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
          this.props.foodItem
        ).then((resolve) => {
          this.setState({
            meal: resolve.data.meals,
          });
        });
      }
    }
  }

  // toggle function for favourite icon

  toggle = () => {
    let localLiked = this.state.liked;
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };

  render() {
    const { meal } = this.state;
    if (meal !== null && meal.length > 0) {
      var list = [];
      let i = 1;

      while (meal[0]["strIngredient" + i] !== "") {
        list.push(
          <li key={i}>
            {meal[0]["strIngredient" + i] + "----" + meal[0]["strMeasure" + i]}
            <br /><br />
          </li>
        );
        i++;
      }
    }

    const id =
      meal !== null && meal.length > 0 ? (
        <div className="recipeContainer">
          <div className="title">
            <h1>{meal[0].strMeal}  <span
              className="heart_icon"
              onClick={() => this.toggle()}
            >
              {this.state.liked === false ? (
                <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
            </span></h1>
          </div>
          {/* code to display all the details of a recipe */}
          <div className="recipeData">
            <img
              src={meal[0].strMealThumb}
              alt={"Your meal for " + meal[0].strMeal}
            />
            <div className="textData">
              <p>
                <em>Category of Meal - </em> {meal[0].strCategory}{" "}
              </p>
              <p>
                <em>Area of the Meal - </em> {meal[0].strArea}{" "}
              </p>
              <br />
              <h3>Ingredients:</h3>
              <ul className="ingredients">{list}</ul>
              <br />
              <h3 className="recipes_title">Recipes</h3>
              <div className="recipe">{meal[0].strInstructions}</div>
            </div>
          </div>
        </div>
      ) : (
        // error handling(if entered data doesn't match with the api's data)
        <div className="noData">No Data has been recieved</div>
      );
    return <div>{id}</div>;
  }
}

export default RecipeBody;
