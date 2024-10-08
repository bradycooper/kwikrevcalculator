// src/ui/components/Card.tsx
import React from "react"
import PropTypes from "prop-types"

const Card = ({ show, title, description }) => {
  if (!show) return null // If not show, return nothing.

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-[400px] max-w-[90%] flex items-center">
        {/* Green Tick Icon */}
        <img
          src={require("../../../assets/images/ok.png")}
          alt="Green Tick"
          className="w-6 h-6 mr-4"
        />

        <div>
          {/* Title (if required) */}
          {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}

          {/* Description */}
          <p className="text-lg text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string.isRequired
}

export default Card
