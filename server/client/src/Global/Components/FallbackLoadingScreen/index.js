import React from "react";
import { FALLBACK_SCREEN_TYPES } from "./constants";

function FallbackLoadingScreen({ type }) {
  switch (type) {
    case FALLBACK_SCREEN_TYPES.APP_LOADING:
      return (
        <div className="fallbackLoadingScreen">
          <article className="spinner"></article>
        </div>
      );

    default:
      return null;
  }
}

export default FallbackLoadingScreen;
