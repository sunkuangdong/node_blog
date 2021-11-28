import React, { ChangeEventHandler, FormEventHandler } from 'react';

type Props = {
    onSubmit: FormEventHandler
    fields: {
        label: string,
        type: "text" | "password",
        value: string | number,
        onChange: ChangeEventHandler<HTMLInputElement>,
        errors: string[]
    }[]
}

const Form: React.FC<Props> = (props) => {
    const { fields, onSubmit, ...rest } = props
    return (
        <form action="" onSubmit={onSubmit}>
            {fields.map((field, index) =>
                <div key={index}>
                    <label>{field.label}</label>
                    <input type={field.type} value={field.value} onChange={field.onChange} />
                    {field.errors?.length > 0 && <div>{field.errors.join(', ')}</div>}
                    {/* <select>
                        <option value="">--Please choose an option--</option>
                        <option value="dog">Dog</option>
                    </select> */}
                </div>
            )}
            <div>
                {rest}
            </div>
        </form>
    )
}

export default Form