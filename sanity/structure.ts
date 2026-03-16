import type {StructureResolver} from 'sanity/structure'
import {CogIcon, DocumentsIcon, ComponentIcon, ArchiveIcon, CheckmarkCircleIcon, CloseCircleIcon, TagIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Penn Rock Admin')
    .items([
      // 1. ALL MASTER INVENTORY (Trucks + Parts)
      S.listItem()
        .title('All Master Inventory')
        .icon(ArchiveIcon)
        .child(
          S.documentList()
            .title('All Inventory')
            .filter('_type in ["inventory", "part"]')
        ),

      S.divider(),

      // 2. TRUCKS & EQUIPMENT FOLDER
      S.listItem()
        .title('Trucks & Equipment')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Trucks & Equipment')
            .items([
              S.listItem()
                .title('All Trucks')
                .icon(DocumentsIcon)
                .child(
                  S.documentList()
                    .title('All Trucks')
                    .filter('_type == "inventory"')
                ),
              S.listItem()
                .title('Active Trucks')
                .icon(CheckmarkCircleIcon)
                .child(
                  S.documentList()
                    .title('Active Trucks')
                    .filter('_type == "inventory" && status != "sold"')
                ),
              S.listItem()
                .title('Sold Trucks')
                .icon(CloseCircleIcon)
                .child(
                  S.documentList()
                    .title('Sold Trucks')
                    .filter('_type == "inventory" && status == "sold"')
                ),

              S.divider(),

              // Browse by Make
              S.listItem()
                .title('Browse by Make')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Manufacturers')
                    .items([
                      S.listItem().title('Kenworth').child(
                        S.documentList().title('Kenworths').filter('_type == "inventory" && make == "Kenworth"')
                      ),
                      S.listItem().title('Peterbilt').child(
                        S.documentList().title('Peterbilts').filter('_type == "inventory" && make == "Peterbilt"')
                      ),
                      S.listItem().title('Mack').child(
                        S.documentList().title('Macks').filter('_type == "inventory" && make == "Mack"')
                      ),
                      S.listItem().title('Ford').child(
                        S.documentList().title('Fords').filter('_type == "inventory" && make == "Ford"')
                      ),
                      S.listItem().title('Freightliner').child(
                        S.documentList().title('Freightliners').filter('_type == "inventory" && make == "Freightliner"')
                      ),
                      S.listItem().title('International').child(
                        S.documentList().title('Internationals').filter('_type == "inventory" && make == "International"')
                      ),
                      S.listItem().title('Other Makes').child(
                        S.documentList().title('Other Makes').filter('_type == "inventory" && !(make in ["Kenworth", "Peterbilt", "Mack", "Ford", "Freightliner", "International"])')
                      ),
                    ])
                ),

              // Browse by Category
              S.listItem()
                .title('Browse by Category')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem().title('Dump Trucks').child(
                        S.documentList().title('Dump Trucks').filter('_type == "inventory" && category == "dump-trucks"')
                      ),
                      S.listItem().title('Day Cabs').child(
                        S.documentList().title('Day Cabs').filter('_type == "inventory" && category == "day-cabs"')
                      ),
                      S.listItem().title('Trailers').child(
                        S.documentList().title('Trailers').filter('_type == "inventory" && category == "trailers"')
                      ),
                      S.listItem().title('Heavy Equipment').child(
                        S.documentList().title('Heavy Equipment').filter('_type == "inventory" && category == "heavy-equipment"')
                      ),
                    ])
                ),
            ])
        ),

      // 3. PARTS DEPARTMENT FOLDER
      S.listItem()
        .title('Parts Department')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Parts Department')
            .items([
              S.listItem()
                .title('All Parts')
                .icon(ComponentIcon)
                .child(
                  S.documentList()
                    .title('All Parts')
                    .filter('_type == "part"')
                ),
              S.listItem()
                .title('Available Parts')
                .icon(CheckmarkCircleIcon)
                .child(
                  S.documentList()
                    .title('Available Parts')
                    .filter('_type == "part" && status == "available"')
                ),
              S.listItem()
                .title('Out of Stock / Sold')
                .icon(CloseCircleIcon)
                .child(
                  S.documentList()
                    .title('Out of Stock / Sold')
                    .filter('_type == "part" && status in ["sold", "out-of-stock"]')
                ),

              S.divider(),

              // By Category
              S.listItem()
                .title('By Category')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Parts Categories')
                    .items([
                      S.listItem().title('Engines').child(
                        S.documentList().title('Engines').filter('_type == "part" && category == "engine"')
                      ),
                      S.listItem().title('Transmissions').child(
                        S.documentList().title('Transmissions').filter('_type == "part" && category == "transmission"')
                      ),
                      S.listItem().title('Body/Cab').child(
                        S.documentList().title('Body/Cab').filter('_type == "part" && category == "body-cab"')
                      ),
                      S.listItem().title('Maintenance/Filters').child(
                        S.documentList().title('Maintenance/Filters').filter('_type == "part" && category == "maintenance-filters"')
                      ),
                      S.listItem().title('Accessories').child(
                        S.documentList().title('Accessories').filter('_type == "part" && category == "accessories"')
                      ),
                      S.listItem().title('Other').child(
                        S.documentList().title('Other').filter('_type == "part" && category == "other"')
                      ),
                    ])
                ),
            ])
        ),
    ])