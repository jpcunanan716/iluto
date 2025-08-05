const LoadingSpinner = ({ size = 8, color = 'orange' }) => {
    const colorClasses = {
        orange: 'border-orange-400 border-t-orange-100',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-400 border-t-gray-100'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div
                className={`animate-spin rounded-full border-4 ${colorClasses[color]}`}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
            ></div>
            <p className="text-gray-500">Loading...</p>
        </div>




    );
};

export default LoadingSpinner;