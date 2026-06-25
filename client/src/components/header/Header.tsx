import style from './header.module.scss'


export const Header = () => {
    return(
        <header>
            <div className={style.headerInner}>

                <div className={style.logo}>
                    <h1>marketplace</h1>
                </div>

                <div className={style.userInfo}>
                    <p>user</p>
                </div>

            </div>
        </header>
    )
}