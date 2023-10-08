import React from "react"
import { Label } from "reactstrap"

const LoginForm = ({ handleSubmit, onSubmit, register }) => {
  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label className="form-label">Нэр</Label>
        <input
          {...register("name")}
          name="name"
          className="form-control"
          placeholder="Нэрээ оруулна уу"
        />
      </div>

      <div className="mb-3">
        <Label className="form-label">Нууц үг</Label>
        <input
          name="password"
          type="password"
          placeholder="Нууц үгээ оруулна уу"
          className="form-control"
          {...register("password")}
        />
      </div>
      <div className="mt-3 d-grid">
        <button className="btn btn-primary btn-block" type="submit">
          Нэвтрэх
        </button>
      </div>
    </form>
  )
}

export default LoginForm
