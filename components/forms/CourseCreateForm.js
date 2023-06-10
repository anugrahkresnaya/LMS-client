'use client'
import Image from "next/image";

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  handleRemoveImage
}) => {
  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={handleSubmit} className="flex justify-center flex-col bg-base-300 rounded px-5">
        <input 
          type="text"
          name="name"
          placeholder="Course Name"
          value={values.name}
          onChange={handleChange}
          className="input input-bordered input-primary w-full mt-5"
        />
        <textarea 
          name="description" 
          id="description" 
          cols="7"
          rows="7"
          placeholder="Course Description"
          value={values.description}
          onChange={handleChange}
          className="mt-5 p-4 bg-base-100"
        ></textarea>
        <div>
          <select 
            className="select select-primary w-full mt-5"
            value={values.paid}
            onChange={(v) => setValues({ ...values, paid: !values.paid })}
          >
            <option disabled selected>Is it paid or free?</option>
            <option value={true}>Paid</option>
            <option value={false}>Free</option>
          </select>
          {values.paid && (
            <div>
              <label htmlFor="price" className="mt-5">Input your price</label>
              <input 
                type="number"
                name="price"
                placeholder="Rp."
                onChange={handleChange}
                className="input input-bordered input-primary w-full mt-1"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="image" className="mt-5">Input file for image preview course</label>
          <input 
            type="file" 
            name="image"
            onChange={handleImage}
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full mt-1"
          />
          {preview && (
            <div>
              <div className="avatar mt-5 flex justify-center">
                <div className="w-24 rounded">
                  <Image 
                    src={preview} 
                    width={40} 
                    height={40} 
                    alt="course preview"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button 
                  className="btn btn-xs btn-primary"
                  onClick={handleRemoveImage}
                >
                  delete
                </button>
              </div>
            </div> 
          )}
        </div>
        <button
          className="btn btn-outline btn-primary w-40 mx-auto my-5" 
          onClick={handleSubmit}
        >Save</button>
      </form>
    </div>
  )
}

export default CourseCreateForm;
