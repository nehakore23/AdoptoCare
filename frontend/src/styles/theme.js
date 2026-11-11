
export const theme = {

  colors: {

    primary: '#F4B942',       
    primaryLight: '#F7C55A',   
    primaryDark: '#E6A532',    
    

    secondary: '#2C3E50',      
    secondaryLight: '#34495E',
    
  
    white: '#FFFFFF',
    lightGray: '#F8F9FA',      
    gray: '#6C757D',          
    darkGray: '#495057',       
    
  
    success: '#28A745',       
    warning: '#FFC107',        
    danger: '#DC3545',        
    info: '#17A2B8',          
    

    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundAccent: '#FFF9E6', 
  },
  

  typography: {
    fontFamily: {
      primary: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      heading: "'Poppins', 'Inter', sans-serif",
    },
    fontSize: {
      xs: '0.75rem',    
      sm: '0.875rem',   
      base: '1rem',     
      lg: '1.125rem',   
      xl: '1.25rem',   
      '2xl': '1.5rem',  
      '3xl': '1.875rem', 
      '4xl': '2.25rem', 
      '5xl': '3rem',   
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  

  spacing: {
    xs: '0.25rem', 
    sm: '0.5rem',    
    md: '1rem',      
    lg: '1.5rem',    
    xl: '2rem',     
    '2xl': '3rem',  
    '3xl': '4rem',   
    '4xl': '6rem',   
  },
  

  borderRadius: {
    none: '0',
    sm: '0.25rem',  
    md: '0.5rem',    
    lg: '0.75rem',   
    xl: '1rem',      
    '2xl': '1.5rem', 
    full: '9999px',
  },
  

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    card: '0 4px 20px rgba(0, 0, 0, 0.08)',
    hover: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
  

  components: {
    button: {
      primary: {
        background: '#F4B942',
        color: '#FFFFFF',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        hover: {
          background: '#E6A532',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(244, 185, 66, 0.3)',
        }
      },
      secondary: {
        background: 'transparent',
        color: '#F4B942',
        border: '2px solid #F4B942',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        hover: {
          background: '#F4B942',
          color: '#FFFFFF',
          transform: 'translateY(-2px)',
        }
      }
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #F1F3F4',
      transition: 'all 0.3s ease',
      hover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      }
    },
    navbar: {
      background: '#FFFFFF',
      borderBottom: '1px solid #E9ECEF',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      padding: '1rem 0',
    }
  },
  

  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  }
};


export const getColor = (colorPath) => {
  const keys = colorPath.split('.');
  let value = theme.colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};

export const getSpacing = (size) => theme.spacing[size];
export const getBorderRadius = (size) => theme.borderRadius[size];
export const getShadow = (size) => theme.shadows[size];

export default theme;
