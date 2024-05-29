import React from 'react';
import { Button, Card, Space } from 'antd';

const CategoryListComponent = ({category}) => {
    const jobCategories = [
        { name: 'Frontend Developer', count: 7 },
        { name: 'Backend Developer', count: 1 },
        { name: 'Product Design', count: 1 },
        { name: 'Product Mindset', count: 1 },
        { name: 'Software Development', count: 1 },
        { name: 'Communication', count: 1 },
        { name: 'UX/UI Designer', count: 1 },
        { name: 'Product Backend', count: 1 },
        { name: 'Data Analyst', count: 0 },
        { name: 'Marketing Intern', count: 0 },
      
       
      ];

  return (
    <div className="flex flex-col bg-neutral-1 shadow-level-1">
      <h3 className="px-6 py-6 font-bold">Nhóm công việc</h3>
      <ul className="flex-1 overflow-y-auto px-6 text-neutral-7">
        {jobCategories.map((category, index) => (
          <li key={index} className="px-4 py-5 hover:text-tertiary-5">
            <Button justify="between" className="w-full"  style={{ whiteSpace: "normal" }}
                >
                
              <span>{category.name} ({category.count})</span>
             
            
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryListComponent;
