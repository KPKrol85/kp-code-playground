const variants = {
  primary: "bg-forge-700 text-white hover:bg-forge-900 focus-visible:ring-forge-500 dark:bg-forge-500 dark:hover:bg-forge-600",
  secondary: "border border-cream-200 bg-white text-forge-900 hover:border-forge-500 hover:bg-forge-50 dark:border-white/10 dark:bg-white/[0.06] dark:text-cream-50 dark:hover:border-forge-500 dark:hover:bg-white/10",
  light: "bg-cream-50 text-charcoal-900 hover:bg-white focus-visible:ring-cream-200",
  outlineLight: "border border-white/24 bg-white/5 text-white hover:bg-white/[0.12] focus-visible:ring-cream-200",
};

function Button({ children, href, variant = "primary", className = "", ...props }) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-4 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}

export default Button;
