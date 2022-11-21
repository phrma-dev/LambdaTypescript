import React from 'react';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
  CardHeader,
  CardMedia,
	Container,
	Divider,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import { store } from '../../../app/state-management/store';
import { useAppDispatch, useAppSelector } from '../../../app/state-management/hooks';
import DocumentAPI from '../../../api/DocumentAPI';
import { productApi } from '../../../__fake-api__/product-api';

import type { Filters } from '../../../Components/toolkits/itToolkit/product-list-filters';
import { ProjectListFilters } from '../../../Components/toolkits/itToolkit/product-list-filters';
import { ProductListTable } from '../../../Components/toolkits/itToolkit/product-list-table';
import { useMounted } from '../../../hooks/use-mounted';
import * as muiIcons from '@mui/icons-material';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import type { Product } from '../../../types/product';

const applyFilters = (
  products: Product[],
  filters: Filters
): Product[] => products.filter((product) => {
  if (filters.name) {
    const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    const categoryMatched = filters.category.includes(product.category);

    if (!categoryMatched) {
      return false;
    }
  }

  // It is possible to select multiple status options
  if (filters.status?.length > 0) {
    const statusMatched = filters.status.includes(product.status);

    if (!statusMatched) {
      return false;
    }
  }

  // Present only if filter required
  if (typeof filters.inStock !== 'undefined') {
    const stockMatched = product.inStock === filters.inStock;

    if (!stockMatched) {
      return false;
    }
  }

  return true;
});

const applyPagination = (
  products: Product[],
  page: number,
  rowsPerPage: number
): Product[] => products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const ProductList = () => {
  const isMounted = useMounted();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProducts = useCallback(async () => {
    try {
      const data = await productApi.getProducts();

      if (isMounted()) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getProducts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFiltersChange = (filters: Filters): void => {
    setFilters(filters);
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

  return (
    <>
          <Card>
            <ProjectListFilters onChange={handleFiltersChange} />
            <ProductListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              products={paginatedProducts}
              productsCount={filteredProducts.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>

    </>
  );
};

ProductList.getLayout = (page: any) => (

      {page}

);




const ITToolkit = () => {
	const [displayBanner, setDisplayBanner] = useState<boolean>(true);
	const state = useAppSelector((state: any) => state);
	const dispatch = useAppDispatch();
	const { _getFiles } = DocumentAPI();

	useEffect(() => {
		// Restore the persistent state from local/session storage
		const value = globalThis.sessionStorage.getItem('dismiss-banner');
		_getFiles("Toolkits/ITToolkit");
		if (value === 'true') {
			// setDisplayBanner(false);
		}
	}, []);

	const handleDismissBanner = () => {
		// Update the persistent state
		// globalThis.sessionStorage.setItem('dismiss-banner', 'true');
		setDisplayBanner(false);
	};

	return (
		<>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{mb: 2}} >
                <Typography variant="h4">IT Toolkit</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} sx={{mb: 4}} >
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 151, transform: 'scale(1.33)', transformOrigin: 'center' }}
                      image="https://i.pinimg.com/originals/38/8c/60/388c6075205f67b8a9b66767252c7362.gif"
                      alt="Wifi"
                      />

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Network: <b>PhRMA_Guest</b>
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        Password: <b>coleman1892</b>
                      </Typography>
                    </CardContent>
                  </Box>
      
                </Card>
              </Grid>
              <Grid item xs={12} >
                <ProductList />
              </Grid>
							{/*<Grid item>*/}
							{/*	<Typography>{JSON.stringify(state.intranetDocuments.files)}hello</Typography>*/}
       {/*       </Grid>*/}
            </Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};
export default ITToolkit;
