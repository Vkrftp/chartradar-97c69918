import React, { useState } from 'react';
import { Search, Bell, User, TrendingUp, ChevronDown, BarChart3, Shield, Target, PieChart, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const strategyItems = [
    {
      title: "Trading Strategies",
      description: "Access trading strategies tools and insights",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: "Risk Management", 
      description: "Access risk management tools and insights",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "Portfolio Optimization",
      description: "Access portfolio optimization tools and insights", 
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Market Analysis",
      description: "Access market analysis tools and insights",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "Backtesting",
      description: "Access backtesting tools and insights",
      icon: <TestTube className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="bg-background border-b border-border">
      {/* Top bar with market data */}
      <div className="bg-primary text-primary-foreground px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-4 h-4" />
            <span>BTC $43,250.00</span>
            <span className="text-success">+2.45%</span>
            <span className="ml-4">Live Market Data - Real-time Updates</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <PieChart className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">CryptoRadar</span>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                  Future
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background border border-border p-6 min-w-[500px]">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-primary">Futures Trading</div>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Access advanced futures trading tools and real-time market data with comprehensive analysis features.
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span>Real-time futures price tracking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span>Advanced technical analysis tools</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span>Risk management calculators</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                  Options
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background border border-border p-6 min-w-[500px]">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-primary">Options Trading</div>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Comprehensive options analysis and trading strategies with advanced Greeks calculations.
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span>Options chain analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span>Volatility surface mapping</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span>Greeks monitoring (Delta, Gamma, Theta, Vega)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                  Strategy
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background border border-border p-6 min-w-[600px]">
                  <div className="grid grid-cols-2 gap-4">
                    {strategyItems.map((item, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg hover:bg-accent/10 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-primary mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm mb-1">{item.title}</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background border border-border p-6 min-w-[600px]">
                  <div className="space-y-6">
                    <div>
                      <div className="text-lg font-semibold text-primary mb-2">About CryptoRadar</div>
                      <div className="text-sm text-muted-foreground">
                        A comprehensive trading platform for stocks and cryptocurrency analysis with advanced pattern recognition and real-time market data.
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="text-sm font-medium mb-3 text-primary">Development Team</div>
                      <div className="text-xs text-muted-foreground mb-3">
                        This application was developed by talented software developers graduated with B.Tech Computer Science from SRM University:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">VINOD SINGH</span>
                          <span className="text-xs text-muted-foreground">- Software Developer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">VIPUL DHANKAR</span>
                          <span className="text-xs text-muted-foreground">- Software Developer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">VIKRAM SINHA</span>
                          <span className="text-xs text-muted-foreground">- Software Developer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and User Controls */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks, crypto..."
                className={`pl-10 w-64 bg-secondary/50 border-border transition-all duration-200 ${
                  isSearchFocused ? 'w-80 bg-secondary' : ''
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/10">
              🌙
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hover:bg-accent/10 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full text-xs flex items-center justify-center text-warning-foreground">
                1
              </span>
            </Button>

            {/* Login */}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;