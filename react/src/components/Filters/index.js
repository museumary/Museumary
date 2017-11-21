/*
    Export file for all model filters.
        Artists
        Types
        Works
        Venues
*/

// Higher order component filter that acts as the base for every other.
import MasterFilter from './MasterFilter';

// Import filters from each file
import ArtistsFilterBase from './ArtistsFilter';
import TypesFilterBase from './TypesFilter';
import WorksFilterBase from './WorksFilter';
import VenuesFilterBase from './VenuesFilter';

// Export the filter wrapped in the Master Filter
export const ArtistsFilter = MasterFilter(ArtistsFilterBase);
export const TypesFilter = MasterFilter(TypesFilterBase);
export const WorksFilter = MasterFilter(WorksFilterBase);
export const VenuesFilter = MasterFilter(VenuesFilterBase);

