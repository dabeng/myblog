import { useForm } from 'react-hook-form';

export default function BlogForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const resetForm = () => {
    reset();
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          {/* register your input into the hook by invoking the "register" function */}
          <input
            className="input"
            type="text"
            {...register('title', { required: true })}
          />
          {errors.content && <span>This field is required</span>}
        </div>
      </div>
      <div className="field">
        <label className="label">SubTitle</label>
        <div className="control">
          <input className="input" type="text" {...register('subtitle')} />
        </div>
      </div>
      <div className="field">
        <label className="label">Content</label>
        <div className="control">
          {/* include validation with required or other standard HTML validation rules */}
          <textarea
            className="textarea"
            {...register('content', { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.content && <span>This field is required</span>}
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Save
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
