import React, { ChangeEventHandler, FormEventHandler, ReactElement } from 'react';

type Props = {
    onSubmit: FormEventHandler
    fields: {
        label: string,
        type: "text" | "password" | 'textarea',
        value: string | number,
        onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
        errors: string[],
    }[],
    buttons: ReactElement
}

const Form: React.FC<Props> = (props) => {
    const { fields, onSubmit, buttons, ...rest } = props
    return (
        <form action="" onSubmit={onSubmit}>
            {fields.map((field, index) =>
                <div key={index}>
                    <label>{field.label}</label>
                    {field.type === 'textarea' ?
                        <textarea value={field.value} onChange={field.onChange}>{field.value}</textarea> :
                        <input type={field.type} value={field.value} onChange={field.onChange} />}
                    {field.errors?.length > 0 && <div>{field.errors.join(', ')}</div>}
                    {/* <select>
                        <option value="">--Please choose an option--</option>
                        <option value="dog">Dog</option>
                    </select> */}
                </div>
            )}
            {buttons}
        </form>
    )
}

export default Form