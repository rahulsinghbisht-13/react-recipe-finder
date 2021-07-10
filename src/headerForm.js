import React, { Component } from "react";
import "./css/header-form.css";
import RecipeBody from "./RecipeBody";

class HeaderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      foodItem: "",
    };
  }

  getRecipe = (e) => {
    e.preventDefault();

    var item = document.getElementById("text").value;

    this.setState({
      searched: true,
      foodItem: item,
    });
  };

  render() {
    return (
      <div>
        <div className="header-container">
          <h1 className="heading">Meal Recipe Finder</h1>
          <form className="input-form">
            <input
              type="text"
              placeholder="Enter the name of the dish"
              id="text"
            />
            <input
              type="submit"
              value="Get Ingredients"
              onClick={this.getRecipe}
            />
          </form>
        </div>
        {this.state.searched ? (
          <RecipeBody foodItem={this.state.foodItem} />
        ) : (
          <h2 className="center">
            Type a Dish Name to search for its ingredients
          </h2>
        )}
      </div>
    );
  }
}
export default HeaderForm;
