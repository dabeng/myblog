import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { db } from '../../shared/db';

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getBlogById = async () => {
    return id ?
      await db.blogs
        .where('id')
        .equals(Number.parseInt(id))
        .first()
      : null;
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: getBlogById
  });

  const addBlog = async (data) => {
    try {
      // TODO：add author
      data.publishedDate = new Date();
      const id = await db.blogs.add(data);
      navigate('/blogs');
    } catch (error) {
      // TODO: output error message
    }
  };

  const updateBlog = async (data) => {
    try {
      if (Object.keys(dirtyFields).length === 0) {
        return;
      }
      const updatedData = {};
      for (const key of Object.keys(dirtyFields)) {
        updatedData[key] = data[key];
      }
      updatedData['updatedDate'] = new Date();
      await db.blogs.update(Number.parseInt(id), { ...updatedData });
      navigate('/blogs');
    } catch (error) {
      // TODO: output error message
    }
  };

  const onSubmit = (data) => {
    if (!id) {
      addBlog(data);
    } else {
      updateBlog(data);
    }
  };

  const resetForm = () => {
    reset();
  };

  const cancelForm = () => {
    navigate('/blogs');
  };

  //console.log(watch('example')); // watch input value by passing the name of it

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
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={cancelForm}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}