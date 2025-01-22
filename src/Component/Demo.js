import React, { useState, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import axios from "axios";

const Demo = () => {
  const [admins, setAdmins] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch data function
  const fetchAdmins = async (page) => {
    try {
      const response = await axios.get(
        `https://backend.iimiin.com/admins?searching=&page=${page}&limit=${pageSize}`
      );
      if (response.data && response.data.success) {
        const { result, total } = response.data.data;
        setAdmins(result);
        setTotal(total);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching admins:", error.message);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchAdmins(newPage);
  };

  // Fetch data on component mount and page change
  useEffect(() => {
    fetchAdmins(currentPage);
  }, [currentPage]);

  return (
    <div>
      {/* Display the fetched admin data */}
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            {admin.firstname} {admin.lastname} - {admin.email}
          </li>
        ))}
      </ul>

      {/* Pagination Component */}
      <PaginationRoot
        count={Math.ceil(total / pageSize)} // Total pages
        pageSize={pageSize}
        defaultPage={1}
        onChange={handlePageChange} // Update data on page change
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </div>
  );
};

export default Demo;
