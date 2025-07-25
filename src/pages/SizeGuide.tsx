import InfoPage from '@/components/InfoPage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SizeGuide = () => {
  return (
    <InfoPage title="Size Guide">
      <div className="space-y-4">
        <p className="text-center text-gray-700 dark:text-gray-300">
          Find your perfect fit with our size guide.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Chest (in)</TableHead>
              <TableHead>Waist (in)</TableHead>
              <TableHead>Hips (in)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>XS</TableCell>
              <TableCell>34-36</TableCell>
              <TableCell>28-30</TableCell>
              <TableCell>34-36</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>S</TableCell>
              <TableCell>36-38</TableCell>
              <TableCell>30-32</TableCell>
              <TableCell>36-38</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>M</TableCell>
              <TableCell>38-40</TableCell>
              <TableCell>32-34</TableCell>
              <TableCell>38-40</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>L</TableCell>
              <TableCell>40-42</TableCell>
              <TableCell>34-36</TableCell>
              <TableCell>40-42</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>XL</TableCell>
              <TableCell>42-44</TableCell>
              <TableCell>36-38</TableCell>
              <TableCell>42-44</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </InfoPage>
  );
};

export default SizeGuide;
