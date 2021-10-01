import cn from 'classnames'
import s from './style.module.css';

const Input = ({value, label, type="text", name, onChange, required}) => {
    const handleChange = (e) => {
        onChange && onChange(e)
    }
    return (
        <div className={cn(s.root, {[s.valid]: value})}>
            <input 
                className={s.input} 
                value={value}
                label={label}
                type={type}
                required={required}
                name={name}
                onChange={handleChange}
            />
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{name}</label>
        </div>  
    )
};

export default Input;