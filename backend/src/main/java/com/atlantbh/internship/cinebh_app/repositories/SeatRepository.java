package com.atlantbh.internship.cinebh_app.repositories;

import com.atlantbh.internship.cinebh_app.domain.Seat;
import com.atlantbh.internship.cinebh_app.projections.ProjectionSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.Collection;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    @Query(value = """
WITH reserved_info AS (
    SELECT reserved_seat.seat_id
    FROM reserved_seat JOIN reservation on reserved_seat.reservation_id = reservation.id
    WHERE reservation.projection_id = :projectionId AND reservation.date = :date
)

SELECT seat.id, seat.number, seat.type, EXISTS(SELECT 1 FROM reserved_info ri WHERE ri.seat_id = seat.id) AS reserved
FROM seat JOIN projection ON seat.hall_id = projection.hall_id
WHERE projection.id = :projectionId;
""",
            nativeQuery = true)
    Collection<ProjectionSeat> findAllSeatsByProjectionId(Long projectionId, Instant date);
}
