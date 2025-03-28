import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="border border-gray-200 overflow-hidden">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-goal-600 text-sm mb-1">{title}</p>
          <motion.h3
            className="text-3xl font-bold text-goal-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {value}
          </motion.h3>
        </div>
        <div className="bg-goal-50 h-12 w-12 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
